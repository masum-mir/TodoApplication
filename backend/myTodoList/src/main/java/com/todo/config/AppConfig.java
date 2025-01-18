package com.todo.config;

import java.util.TimeZone;

public class AppConfig {


    public static final String[] NONFILTERRING_PATH_PATTERNS = new String[]{"/core/file/**", "/hr-loan-req/**", "/mainapp/file/**", "/core/auth/**", ",/csrf", "/v2/api-docs", "/swagger-resources/configuration/ui", "/configuration/ui", "/swagger-resources", "/swagger-resources/configuration/security", "/configuration/security", "/swagger-ui.html", "/webjars/**"};
    public static final String[] FILTERRING_PATH_PATTERNS = new String[]{"/**"};

    private static final String APPLICATION_JWT_PRIVATE_KEY = "0E041573DA7FEBD98D5679005566D9584DB9FB638C2C411BA94DE612E519C411";

    private static TimeZone APP_TIME_ZONE = TimeZone.getTimeZone("Asia/Dhaka");
    private static TimeZone DB_TIME_ZONE = TimeZone.getTimeZone("Asia/Dhaka");
    private static String CONTEXT_PATH = "/todo/v1";

    private static String SERVER_PORT = "8088";

    private static int APP_THREAD_CORE_POOL_SIZE = 0;
    private static int APP_THREAD_MAX_POOL_SIZE = 0;
    private static int APP_THREAD_QUEUE_SIZE = 0;

    private static String APP_DB_URL = "";
    private static String APP_DB_USER = null;
    private static String APP_DB_PASSWORD = null;
    private static long APP_DB_CONN_TIME_OUT = 600000;
    private static long APP_DB_CONN_MAX = 500;
    private static long APP_DB_CONN_MIN = 20;

    private static int APP_TOKEN_VALIDITY = 30;

    public static String getAPPLICATION_JWT_PRIVATE_KEY() {
        return APPLICATION_JWT_PRIVATE_KEY;
    }
}