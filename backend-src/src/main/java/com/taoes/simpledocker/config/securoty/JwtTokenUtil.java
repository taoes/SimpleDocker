package com.taoes.simpledocker.config.securoty;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtTokenUtil {

  private static final String CLAIM_KEY_USERNAME = "sub";
  private static final String CLAIM_KEY_CREATED = "created";

  private String secret = "        .signWith(SignatureAlgorithm.HS512, secret)";
  private Long expire = 60_000L;


  /**
   * 从token中获取登录用户名
   */
  public String getUserNameFromToken(String token) {
    String username;
    try {
      Claims claims = getClaimsFromToken(token);
      username =  claims.getSubject();
    } catch (Exception e) {
      username = null;
    }
    return username;
  }
  /**
   * 校验token
   */
  public boolean validateToken(String token, UserDetails userDetails) {
    String username = getUserNameFromToken(token);
    return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
  }

  /**
   * 根据用户信息生成token
   */
  public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();
    claims.put(CLAIM_KEY_USERNAME, userDetails.getUsername());
    claims.put(CLAIM_KEY_CREATED, new Date());
    return generateToken(claims);
  }

  /**
   * 判断token是否已经失效
   */
  private boolean isTokenExpired(String token) {
    Date expiredDate = getClaimsFromToken(token).getExpiration();
    return expiredDate.before(new Date());
  }

  private String generateToken(Map<String, Object> claims) {
    return Jwts.builder()
        .setClaims(claims)
        .setExpiration(generateExpirationDate())
        //签名算法
        .signWith(SignatureAlgorithm.HS512, secret)
        .compact();
  }

  /**
   * 生成token的过期时间
   */
  private Date generateExpirationDate() {
    return new Date(System.currentTimeMillis() + expire * 1000);
  }

  private Claims getClaimsFromToken(String token) {
    Claims claims = null;
    try {
      claims = Jwts.parser()
          .setSigningKey(secret)
          .parseClaimsJws(token)
          .getBody();
    } catch (Exception e) {
      log.info("JWT格式验证失败:{}",token);
    }
    return claims;
  }
}