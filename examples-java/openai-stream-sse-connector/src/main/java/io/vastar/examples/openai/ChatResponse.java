package io.vastar.examples.openai;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

/**
 * ChatResponse parser for OpenAI Chat Completions API
 */
public class ChatResponse {
    private static final Gson gson = new GsonBuilder().create();

    /**
     * Parse OpenAI chat completion response and extract message content
     */
    @SuppressWarnings("unchecked")
    public static String parseResponse(String jsonResponse) {
        // Check if response is SSE stream format
        if (jsonResponse.startsWith("data: ")) {
            return parseSSEStream(jsonResponse);
        }

        // Parse standard JSON response
        Type type = new TypeToken<Map<String, Object>>(){}.getType();
        Map<String, Object> response = gson.fromJson(jsonResponse, type);

        // Extract choices array
        List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
        if (choices == null || choices.isEmpty()) {
            throw new RuntimeException("No choices in response");
        }

        // Get first choice
        Map<String, Object> choice = choices.get(0);

        // Extract message
        Map<String, Object> message = (Map<String, Object>) choice.get("message");
        if (message == null) {
            throw new RuntimeException("No message in choice");
        }

        // Get content
        String content = (String) message.get("content");
        if (content == null) {
            throw new RuntimeException("No content in message");
        }

        return content.trim();
    }

    /**
     * Parse complete SSE stream and concatenate all content chunks
     */
    @SuppressWarnings("unchecked")
    private static String parseSSEStream(String sseStream) {
    StringBuilder fullContent = new StringBuilder();
    // Gemini terkadang menggunakan \n\n atau \n sebagai pemisah chunk
    String[] lines = sseStream.split("\n"); 

    for (String line : lines) {
        if (line.startsWith("data: ")) {
            String content = parseStreamChunk(line);
            if (content != null) {
                // Cetak langsung ke konsol agar efek "streaming" terlihat
                System.out.print(content); 
                fullContent.append(content);
            }
        }
    }
    return fullContent.toString().trim();
    }

    /**
     * Parse streaming SSE chunk (for future streaming support)
     */
    public static String parseStreamChunk(String sseData) {
    if (sseData.startsWith("data: ")) {
        String json = sseData.substring(6);
        try {
            Type type = new TypeToken<Map<String, Object>>(){}.getType();
            Map<String, Object> data = gson.fromJson(json, type);

            // Navigasi ke struktur Gemini: candidates -> content -> parts -> text
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) data.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                if (content != null) {
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                    if (parts != null && !parts.isEmpty()) {
                        return (String) parts.get(0).get("text");
                    }
                }
            }
        } catch (Exception e) {
            // Abaikan error parsing pada stream
        }
    }
    return null;
}
}

