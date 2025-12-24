package io.vastar.examples.openai;

import io.vastar.connector.sdk.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yaml.snakeyaml.Yaml;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

/**
 * Gemini Stream SSE Connector (Updated from OpenAI Example)
 */
public class OpenAIStreamConnector implements AutoCloseable {
    private static final Logger logger = LoggerFactory.getLogger(OpenAIStreamConnector.class);

    private final Config config;
    private final RuntimeClient client;

    public OpenAIStreamConnector(Config config) throws IOException {
        this.config = config;
        this.client = RuntimeClient.builder()
            .tenantId(config.runtime.tenantId)
            .workspaceId(config.runtime.workspaceId)
            .timeoutMs(config.getTimeoutMs())
            .build();
    }

    public static void main(String[] args) {
        logger.info("🚀 Gemini Connector Active via Vastar Runtime...");
        logger.info("═════════════════════════════════════════════════════");

        try {
            Config config = loadConfig();

            String useRealOpenAI = System.getenv("USE_REAL_OPENAI");
            if (useRealOpenAI != null) {
                config.useRealOpenai = Boolean.parseBoolean(useRealOpenAI);
            }

            try (OpenAIStreamConnector connector = new OpenAIStreamConnector(config)) {
                connector.runExamples();
            }

            logger.info("═════════════════════════════════════════════════════");
            logger.info("✅ All examples completed successfully!");

        } catch (Exception e) {
            logger.error("❌ Error: {}", e.getMessage(), e);
            System.exit(1);
        }
    }

    private void runExamples() throws Exception {
        if (!config.useRealOpenai) {
            testConnection();
        }
        example1_StreamingChatCompletion();
        example2_NonStreamingChatCompletion();
        example3_InteractiveChat();
    }

    private void testConnection() throws Exception {
        logger.info("📡 Testing connection to Simulator...");
        String url = config.getBaseUrl() + "/test_completion";
        
        HTTPRequest request = HTTPRequest.builder()
            .method("POST")
            .url(url)
            .header("Content-Type", "application/json")
            .body("{}")
            .timeoutMs(10000)
            .tenantId(config.runtime.tenantId)
            .workspaceId(config.runtime.workspaceId)
            .build();

        HTTPResponse response = client.executeHTTP(request);
        if (response.is2xx()) {
            logger.info("✅ Connection test successful!");
        }
    }

    private void example1_StreamingChatCompletion() throws Exception {
        logger.info("Example 1: Streaming Chat Completion");
        ChatRequest chatRequest = ChatRequest.builder()
            .model(config.getModel())
            .addMessage("user", "Explain quantum computing in simple terms.")
            .stream(true)
            .build();

        String response = sendChatRequest(chatRequest);
        logger.info("AI Response: {}", response);
    }

    private void example2_NonStreamingChatCompletion() throws Exception {
        logger.info("Example 2: Non-Streaming Chat");
        ChatRequest chatRequest = ChatRequest.builder()
            .model(config.getModel())
            .addMessage("user", "What is the capital of France?")
            .build();

        String response = sendChatRequest(chatRequest);
        logger.info("AI Response: {}", response);
    }

    private void example3_InteractiveChat() throws Exception {
        logger.info("Example 3: Interactive Chat Simulation");
        ChatRequest.Builder builder = ChatRequest.builder()
            .model(config.getModel());

        String question = "Tell me a fun fact about space.";
        logger.info("You: {}", question);
        builder.addMessage("user", question);
        
        String response = sendChatRequest(builder.build());
        logger.info("AI: {}", response);
    }

    private String sendChatRequest(ChatRequest chatRequest) throws Exception {
        // Menggunakan URL Gemini 1.5 Flash sesuai target performa
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse";
        String jsonBody = chatRequest.toJSON();

        HTTPRequest request = HTTPRequest.builder()
            .method("POST")
            .url(url)
            .header("Content-Type", "application/json")
            .header("x-goog-api-key", config.getApiKey()) 
            .body(jsonBody)
            .timeoutMs(config.getTimeoutMs())
            .tenantId(config.runtime.tenantId)
            .workspaceId(config.runtime.workspaceId)
            .build();

        HTTPResponse response = client.executeHTTP(request);

        if (!response.is2xx()) {
            throw new Exception("API Error " + response.getStatusCode() + ": " + response.getBodyAsString());
        }

        return ChatResponse.parseResponse(response.getBodyAsString());
    }

    private static Config loadConfig() throws IOException {
        Yaml yaml = new Yaml();
        try (InputStream input = new FileInputStream("config.yaml")) {
            Map<String, Object> data = yaml.load(input);
            return Config.fromMap(data);
        }
    }

    @Override
    public void close() throws IOException {
        if (client != null) {
            client.close();
        }
    }

    // Configuration Classes
    static class Config {
        boolean useRealOpenai;
        OpenAIConfig openai;
        SimulatorConfig simulator;
        RuntimeConfig runtime;

        static Config fromMap(Map<String, Object> data) {
            Config config = new Config();
            config.useRealOpenai = (Boolean) data.get("use_real_openai");

            Map<String, Object> openaiData = (Map<String, Object>) data.get("openai");
            config.openai = new OpenAIConfig();
            config.openai.apiKey = expandEnvVar((String) openaiData.get("api_key"));
            config.openai.baseUrl = (String) openaiData.get("base_url");
            config.openai.model = (String) openaiData.get("model");
            config.openai.timeoutMs = (Integer) openaiData.get("timeout_ms");

            // Cari bagian ini di OpenAIStreamConnector.java
            Map<String, Object> simData = (Map<String, Object>) data.get("simulator");
            config.simulator = new SimulatorConfig();
            if (simData != null) { // Tambahkan pengecekan ini
                config.simulator.baseUrl = (String) simData.get("base_url");
                config.simulator.timeoutMs = (Integer) simData.get("timeout_ms");
            } else {
                config.simulator.baseUrl = "http://localhost:4545"; // Default value
                config.simulator.timeoutMs = 10000;
            }

            Map<String, Object> runtimeData = (Map<String, Object>) data.get("runtime");
            config.runtime = new RuntimeConfig();
            config.runtime.socketPath = (String) runtimeData.get("socket_path");
            config.runtime.tenantId = (String) runtimeData.get("tenant_id");
            config.runtime.workspaceId = (String) runtimeData.get("workspace_id");

            return config;
        }

        private static String expandEnvVar(String value) {
            if (value != null && value.startsWith("${") && value.endsWith("}")) {
                String envVar = value.substring(2, value.length() - 1);
                return System.getenv(envVar);
            }
            return value;
        }

        String getBaseUrl() { return useRealOpenai ? openai.baseUrl : simulator.baseUrl; }
        String getApiKey() { return useRealOpenai ? openai.apiKey : "dummy-key"; }
        String getModel() { return useRealOpenai ? openai.model : "gemini-2.5-flash"; }
        int getTimeoutMs() { return useRealOpenai ? openai.timeoutMs : simulator.timeoutMs; }
    }

    static class OpenAIConfig { String apiKey, baseUrl, model; int timeoutMs; }
    static class SimulatorConfig { String baseUrl; int timeoutMs; }
    static class RuntimeConfig { String socketPath, tenantId, workspaceId; }
}