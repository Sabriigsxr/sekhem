import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import GitHubStats from '@site/src/components/GitHubStats';
import HorusEye from '@site/src/components/HorusEye';
import SfxToggle from '@site/src/components/SfxToggle';

// Register custom navbar item types so docusaurus.config.ts can place them
// via `{type: 'custom-...'}` in themeConfig.navbar.items.
export default {
  ...ComponentTypes,
  'custom-githubStats': GitHubStats,
  'custom-horusEye': HorusEye,
  'custom-sfxToggle': SfxToggle,
};
