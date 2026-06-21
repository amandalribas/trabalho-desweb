package br.com.desweb.trabalhodesweb.auth.util;

public record TokenResponse(String token, long idUsuario, String nome, String role) {
}
