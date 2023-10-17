/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com', 'nextjs.org', 'firebasestorage.googleapis.com']
    },
    
      // webpack(config) {
      //   config.experiments = {
      //     ...config.experiments,
      //     topLevelAwait: true
      //   }
      //   return config
      // }
}

module.exports = nextConfig
