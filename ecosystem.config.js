const env = {
  user: 'ubuntu',
  host: process.env.HOST || 'ec2-52-221-245-27.ap-southeast-1.compute.amazonaws.com',
  port: 22,
  key: '~/.ssh/key.pem"',
  repo: 'git@github.com:mhaidarh/node-aws.git',
  path: '/home/ubuntu/node-aws'
}

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
