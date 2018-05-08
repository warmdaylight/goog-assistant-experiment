/**
 * 
 * @param {grunt} grunt 
 */
module.exports = function(grunt) {
    var taskConfig = {
        war: {
            target: {
                options: {
                    war_verbose: true,
                    war_dist_folder: 'build',
                    war_name: 'aunjai-answer',
                    webxml_welcome: 'index.html',
                    webxml_display_name: 'aunjai_answer'
                }
            },
            files: [
                {
                    expand: true,
                    cwd: 'src',
                    src: ['**'],
                    dst: ''
                }
            ]
        }
    }

    grunt.initConfig(taskConfig)
    grunt.loadNpmTasks('grunt-war')

    grunt.registerTask('default', ['war'])
}