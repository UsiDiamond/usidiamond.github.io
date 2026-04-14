
module.exports = {
  src_folders: ['e2e'],
  output_folder: './integration-tests-report/',

  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'e2e/features',
      require: ['e2e/step_definitions']
    }
  },

  globals_path: '',

  test_workers: {
    enabled: false
  },

  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: 'http://localhost:8080',

      screenshots: {
        enabled: false,
        path: 'screens',
        on_failure: true
      },

      desiredCapabilities: {
        browserName: 'chrome'
      },

      webdriver: {
        start_process: true,
        server_path: ''
      },

    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          args: [
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--ignore-certificate-errors',
            '--allow-insecure-localhost',
            '--headless=new',
            '--window-size=1280,1024'
          ]
        }
      },

      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // --verbose
        ]
      }
    },

    'android.real.chrome': {
      desiredCapabilities: {
        real_mobile: true,
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: true,
          androidPackage: 'com.android.chrome',
        },
      },

      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // --verbose
        ]
      }
    },

    'android.emulator.chrome': {
      desiredCapabilities: {
        real_mobile: false,
        avd: 'nightwatch-android-11',
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: true,
          androidPackage: 'com.android.chrome'
        },
      },

      webdriver: {
        start_process: true,
        server_path: 'chromedriver-mobile/chromedriver',
      }
    },
  },
};
