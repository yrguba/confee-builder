import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useParams } from 'react-router';
import { Outlet } from 'react-router-dom';

import { useMedea, useToggle } from 'shared/hooks';
import { Box, animationVariants, Button, Icons } from 'shared/ui';
import { SidebarFromDepartmentPage } from 'widgets/department-page';

import styles from './styles.module.scss';

function DepartmentPage() {
    const { breakpoint } = useMedea();

    const params = useParams();
    const [visibleSidebar, toggle] = useToggle(true);
    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.switcher}>
                {breakpoint === 'sm' ? (
                    visibleSidebar ? (
                        <div className={styles.switcher_go} onClick={() => toggle(false)}>
                            <div>Перейти к</div>
                            <div>{params?.user_name || params?.division_name || params?.department_name || 'компании'}</div>
                        </div>
                    ) : (
                        <Button.Circle active onClick={() => toggle(true)}>
                            <Icons variants="backArrow" color="#fff" />
                        </Button.Circle>
                    )
                ) : null}
            </div>
            <AnimatePresence mode="wait">
                {(visibleSidebar || breakpoint !== 'sm') && (
                    <motion.div key={0} className={styles.sidebar} {...animationVariants.visibleHidden}>
                        <SidebarFromDepartmentPage />
                    </motion.div>
                )}
                {(!visibleSidebar || breakpoint !== 'sm') && (
                    <motion.div key={1} className={styles.mainColumn} {...animationVariants.visibleHidden}>
                        <Outlet />
                    </motion.div>
                )}
            </AnimatePresence>
        </Box.Animated>
    );
}

export default DepartmentPage;
