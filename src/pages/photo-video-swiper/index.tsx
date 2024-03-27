import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const PhotoVideoSwiperPage = lazy(() => import('./ui'));

const photoVideoSwiperPageRouters = <Route path="/photo_video_swiper" element={<PhotoVideoSwiperPage />} />;

export default photoVideoSwiperPageRouters;
