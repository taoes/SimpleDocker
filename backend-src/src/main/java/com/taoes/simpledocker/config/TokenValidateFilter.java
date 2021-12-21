package com.taoes.simpledocker.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.taoes.simpledocker.service.auth.GrantedAuthorityImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.StringUtils;

/**
 * Token 登录过滤器
 *
 * @author 枕上江南 zhoutao925638@vip.qq.com
 * @date 2021/12/5 12:53 上午
 */
@Slf4j
public class TokenValidateFilter extends BasicAuthenticationFilter {

    /**
     * 签名key
     */
    public static final String SIGNING_KEY = "spring-security-@Jwt!&Secret^#";

    public TokenValidateFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws IOException, ServletException {
        String header = request.getHeader("Authorization");
        if (StringUtils.isEmpty(header) || !header.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }
        UsernamePasswordAuthenticationToken authentication = getAuthentication(request, response);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request,
        HttpServletResponse response) throws ServletException, IOException {
        try {
            long start = System.currentTimeMillis();
            String token = request.getHeader("Authorization");
            if (StringUtils.isEmpty(token)) {
                throw new RuntimeException("Token不能为空!");
            }
            // parse the token.
            String user = null;

            Claims claims = Jwts.parser()
                .setSigningKey(SIGNING_KEY)
                .parseClaimsJws(token.replace("Bearer ", ""))
                .getBody();

            long issuedAt = claims.getIssuedAt().getTime();
            long currentTimeMillis = System.currentTimeMillis();
            long expirationTime = claims.getExpiration().getTime();

            // 1. 签发时间 < 当前时间 < (签发时间+((token过期时间-token签发时间)/2)) 不刷新token
            // 2. (签发时间+((token过期时间-token签发时间)/2)) < 当前时间 < token过期时间 刷新token并返回给前端
            // 3. token 过期时间 < 当前时间 跳转登录，重新登录获取token
            // 验证token时间有效性
            if ((issuedAt + ((expirationTime - issuedAt) / 2)) < currentTimeMillis
                && currentTimeMillis < expirationTime) {

                // 重新生成token start
                Calendar calendar = Calendar.getInstance();
                Date now = calendar.getTime();
                calendar.setTime(new Date());
                calendar.add(Calendar.HOUR, 2);
                Date time = calendar.getTime();
                String refreshToken = Jwts.builder()
                    .setSubject(claims.getSubject())
                    .setIssuedAt(now)
                    .setExpiration(time)
                    .signWith(SignatureAlgorithm.HS512, SIGNING_KEY)
                    .compact();

                response.addHeader("refreshToken", refreshToken);
            }
            long end = System.currentTimeMillis();
            log.info("执行时间: {}", (end - start) + " 毫秒");
            user = claims.getSubject();
            if (user != null) {
                String[] split = user.split("-")[1].split(",");
                ArrayList<GrantedAuthority> authorities = new ArrayList<>();
                for (String s : split) {
                    authorities.add(new GrantedAuthorityImpl(s));
                }
                return new UsernamePasswordAuthenticationToken(user, null, authorities);
            }
        } catch (ExpiredJwtException e) {
            request.setAttribute("expiredJwtException", e);
            request.getRequestDispatcher("/expiredJwtException").forward(request, response);
        } catch (UnsupportedJwtException e) {
            request.setAttribute("unsupportedJwtException", e);
            request.getRequestDispatcher("/unsupportedJwtException").forward(request, response);
        } catch (MalformedJwtException e) {
            request.setAttribute("malformedJwtException", e);
            request.getRequestDispatcher("/malformedJwtException").forward(request, response);
        } catch (SignatureException e) {
            request.setAttribute("signatureException", e);
            request.getRequestDispatcher("/signatureException").forward(request, response);
        } catch (IllegalArgumentException e) {
            request.setAttribute("illegalArgumentException", e);
            request.getRequestDispatcher("/illegalArgumentException").forward(request, response);
        }
        return null;
    }

}
