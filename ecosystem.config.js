const meta = require('./package.json')

const env = {
  user: 'ubuntu',
  host: process.env.SERVER_HOST,
  key: process.env.KEY_PATH || '~/.ssh/aws_key.pem"',
  repo: meta.repository.url,
  path: process.env.APP_PATH || '/home/ubuntu/node-aws'
}

module.exports = {

  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration
   */
  apps: [
    {
      name: meta.name + ':dev',
      script: meta.main,
      node_args: '--harmony',
      watch: [meta.main, 'server'],
      ignore_watch: ['node_modules'],
      watch_options: {
        followSymlinks: false
      },
      env: {
        NODE_ENV: 'dev',
        PORT: 3000
      }
    },
    {
      name: meta.name + ':staging',
      script: meta.main,
      node_args: '--harmony',
      watch: [meta.main, 'server'],
      ignore_watch: ['node_modules'],
      watch_options: {
        followSymlinks: false
      },
      env: {
        NODE_ENV: 'staging',
        PORT: 5000
      }
    },
    {
      name: meta.name + ':production',
      script: meta.main,
      node_args: '--harmony',
      watch: [meta.main, 'server'],
      ignore_watch: ['node_modules'],
      watch_options: {
        followSymlinks: false
      },
      env: {
        NODE_ENV: 'production',
        PORT: 8000
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment
   */
  deploy: {
    dev: {
      user: env.user,
      host: env.host,
      key: env.key,
      ref: 'origin/master',
      repo: env.repo,
      path: env.path + '/dev',
      'post-deploy': 'yarn && yarn start:dev'
    },
    staging: {
      user: env.user,
      host: env.host,
      key: env.key,
      ref: 'origin/master',
      repo: env.repo,
      path: env.path + '/staging',
      'post-deploy': 'yarn && yarn start:staging'
    },
    production: {
      user: env.user,
      host: env.host,
      key: env.key,
      ref: 'origin/master',
      repo: env.repo,
      path: env.path + '/production',
      'post-deploy': 'yarn && yarn start:production'
    }
  }

}
