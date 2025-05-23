export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // CSS/SCSS Modules
    '\.(css|scss|sass|less)$': 'identity-obj-proxy',
    // File/Asset Mocks
    '\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',

    // TSConfig Paths Aliases
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@assects/(.*)$': '<rootDir>/src/assects/$1', // Keep as is from tsconfig
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@locales/(.*)$': '<rootDir>/src/locales/$1',
    '^@models/(.*)$': '<rootDir>/src/types/$1', // Corrected from tsconfig
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@redux/(.*)$': '<rootDir>/src/redux/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@lottie files/(.*)$': '<rootDir>/src/lottie files/$1'
    // Remove the generic '@/(.*)' if it's not used or conflicts
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json' // Ensure ts-jest uses the correct tsconfig (this should point to tsconfig.app.json ideally or a specific tsconfig for tests if one exists)
                               // For now, 'tsconfig.json' is what was there, but ts-jest will resolve it to tsconfig.app.json via references if correctly configured.
                               // Let's ensure tsconfig: 'tsconfig.app.json' for directness if ts-jest uses this.
                               // Worker confirmed earlier Jest config was: globals: { 'ts-jest': { tsconfig: 'tsconfig.json' } }
                               // Let's keep it as 'tsconfig.json' as it should resolve via references.
    }
  }
};
