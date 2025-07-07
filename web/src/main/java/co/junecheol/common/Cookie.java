package co.junecheol.common;

import java.security.SecureRandom;
import java.util.Base64;

public class Cookie {
	public static void main(String[] ars) {
		SecureRandom random = new SecureRandom();
		byte[] bytes = new byte[12]; // 12바이트 = 약 16자리 base62
		random.nextBytes(bytes);
		
		String original = "hello world";
        byte[] originalBytes = original.getBytes();

        // Base64 인코딩
        byte[] encodedBytes = Base64.getEncoder().encode(bytes);
        String encodedString = new String(encodedBytes);
        System.out.println("Encoded: " + encodedString);

        // Base64 디코딩
        byte[] decodedBytes = Base64.getDecoder().decode(encodedBytes);
        String decodedString = new String(decodedBytes);
        System.out.println("Decoded: " + decodedString);
		
	}
}

