import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useParams } from 'react-router';
import { Outlet } from 'react-router-dom';

import { useToggle } from 'shared/hooks';
import { Box, animationVariants, Button, Icons } from 'shared/ui';

import styles from './styles.module.scss';

function CompaniesPage() {
    const params = useParams();
    const [visibleSidebar, toggle] = useToggle(true);
    return (
        <Box.Animated visible className={styles.wrapper}>
            Раздел находится в разработке
        </Box.Animated>
    );
}

export default CompaniesPage;
