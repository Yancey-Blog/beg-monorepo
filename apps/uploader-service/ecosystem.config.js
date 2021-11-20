module.exports = {
  apps: [
    {
      name: 'uploder-service',
      script: './dist/main.js',
      watch: ['./dist/'],
      ignore_watch: ['node_modules'],
      autorestart: true,
      max_memory_restart: '1G',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
