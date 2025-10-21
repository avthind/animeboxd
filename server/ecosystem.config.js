// PM2 Ecosystem Configuration
// Usage: pm2 start ecosystem.config.js

module.exports = {
  apps: [
    {
      name: 'animeboxd-api',
      script: './src/server.js',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 9000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 9000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 10000,
      // Advanced features
      max_restarts: 10,
      min_uptime: '10s',
      // Monitoring
      instance_var: 'INSTANCE_ID'
    }
  ]
};

