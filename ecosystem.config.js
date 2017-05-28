const env = require('./env')

console.log(env)

module.exports = {
  apps: [{
    name: 'node-aws',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: env.user,
      host: env.host,
      key: env.key,
      ref: 'origin/master',
      repo: env.repo,
      path: env.path,
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
