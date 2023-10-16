import { ILeaderboard } from '@gomomento/sdk-core';
import { CacheClient, Configurations, CredentialProvider, LeaderboardConfigurations, PreviewLeaderboardClient } from '@gomomento/sdk-web';

let momentoClient: CacheClient;
let leaderboardClient: PreviewLeaderboardClient;
let leaderboard: ILeaderboard;

export function getNewLeaderboard(): ILeaderboard {
  if (leaderboard) return leaderboard;

  if (!import.meta.env.VITE_MOMENTO_API_KEY) {
    throw new Error("missing required env var VITE_MOMENTO_API_KEY");
  }
  if (!import.meta.env.VITE_MOMENTO_CACHE_NAME) {
    throw new Error("missing required env var VITE_MOMENTO_CACHE_NAME");
  }

  if (momentoClient === undefined) {
    momentoClient = new CacheClient({
      configuration: Configurations.Laptop.latest(),
      credentialProvider: CredentialProvider.fromEnvironmentVariable({environmentVariableName: 'VITE_MOMENTO_API_KEY'}),
      defaultTtlSeconds: 3300
    });
  }

  if (leaderboardClient === undefined) {
    leaderboardClient = new PreviewLeaderboardClient({
      configuration: LeaderboardConfigurations.Laptop.v1(),
      credentialProvider: CredentialProvider.fromEnvironmentVariable({environmentVariableName: 'VITE_MOMENTO_API_KEY'}),
    });
  }

  if (leaderboard === undefined) {
    leaderboard = leaderboardClient.leaderboard(import.meta.env.VITE_MOMENTO_CACHE_NAME, 'example-leaderboard');
  }
  
  return leaderboard;
}
