module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        titillium: ['Titillium Web', 'sans-serif'],
      },
      fontSize: {
        xxs: '.563rem',
      },
      margin: {
        body: '1.875rem',
      },
      padding: {
        body: '1.875rem',
      },
      spacing: {
        github_partition1_width: '31.188rem',
        github_partition2_width: '42.938rem',
        github_repository_card_height: '31.875rem',
        github_view_pane_card_height: '37.188rem',
        github_view_pane_card_height_mobile: '40.188rem',
        github_cards_gap: '3.125rem',
        height_info_card_border: '1.688rem',
        github_repo_subcard_height: '3.125rem',
        github_info_card_height: '4.375rem',
        home_partition1_width: '24.938rem',
        home_partition2_width: '48.168rem',
        home_cards_gap: '3.125rem',
        home_notification_card_height: '12.125rem',
        home_news_pane_height: '37.188rem',
        home_news_pane_articlecard_height: '3.313rem',
        '5px': '0.313rem',
        '30px': '1.875rem',
        '88%': '88%',
        '44%': '44%',
      },
      ringWidth: ['hover', 'active'],
      colors: {
        // My Main preset
        border: '#D4D4D4',
        'gray-50': '#FAFAFA',
        'gray-100': '#F5F5F5',
        'gray-200': '#E5E5E5',
        'gray-500': '#737373',
        'gray-600': '#525252',
        'gray-700': '#404040',
        'gray-900': '#171717',

        'blue-50': '#EFF6FF',
        'blue-500': '#3B82F6',
        'blue-600': '#2563EB',
        'blue-700': '#1D4ED8',

        'indigo-500': '#6366F1',

        'violet-500': '#8B5CF6',

        'rose-500': '#F43F5E',
      },
      borderWidth: {
        '5px': '5px',
        10: '10px',
      },
      borderRadius: {
        20: '1.25rem',
      },
      boxShadow: {
        soft: '1px 3px 4px rgba(238, 238, 238, 0.5)',
        github_repo_active_inner_shadow:
          'inset 0px 0px 1px 1px rgba(96, 165, 250, 0.25)',
      },
      dropShadow: {
        soft: 'drop-shadow(1px 3px 4px rgba(238, 238, 238, 0.8))',
      },
    },
  },
  variants: {
    extend: {},
    borderWidth: ['hover'],
  },
  plugins: [],
};
