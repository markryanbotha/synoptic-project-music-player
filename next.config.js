require("dotenv").config()

module.exports = {
    images: {
        domains: [process.env.IMAGE_SOURCE, process.env.IMAGE_SOURCE_2],
    },
}
