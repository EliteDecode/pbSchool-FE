// assets

import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';

// icons
const icons = {
  BookmarksOutlinedIcon,
  BookmarkAddedOutlinedIcon
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const courses = {
  id: 'courses',
  title: 'Courses',
  type: 'group',
  children: [
    {
      id: 'all',
      title: 'All Courses',
      type: 'item',
      url: '/courses',
      icon: icons.BookmarksOutlinedIcon,
      target: true
    },
    {
      id: 'paid',
      title: 'Active Courses',
      type: 'item',
      url: '/active_courses',
      icon: icons.BookmarkAddedOutlinedIcon,
      target: true
    }
  ]
};

export default courses;
