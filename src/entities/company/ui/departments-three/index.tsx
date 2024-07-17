import React, { CSSProperties } from 'react';

import { useArray, useEasyState, useWidthMediaQuery } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Card, Collapse, Icons, Image, Title } from 'shared/ui';

function DepartmentsThreeView({ departments = [], tabsAndLists, activeUserId, updEmployee, padding = 12, selectedUsers }: any) {
    const arr = useArray({ initialArr: [] });
    return departments.map((dep: any) => {
        return (
            <Item
                selectedUsers={selectedUsers}
                key={dep.id}
                padding={padding}
                department={dep}
                tabsAndLists={tabsAndLists}
                arr={arr}
                activeUserId={activeUserId}
                updEmployee={updEmployee}
            />
        );
    });
}

function Item({ department, tabsAndLists, arr, activeUserId, updEmployee, padding, selectedUsers }: any) {
    const isOpen = useEasyState(false);
    return (
        <Collapse
            headerStyle={{ padding: `0 ${padding}px`, width: `calc(100% - ${padding}px)` }}
            childStyle={{ padding: `0 ${padding}px`, width: `calc(100% - ${padding}px)` }}
            openClose={(value) => {
                if (value) {
                    // tabsAndLists.getEmployees(department.id);
                    tabsAndLists.getDepartmentChildrens(department.id);
                }
                isOpen.set(value);
            }}
            isOpen={arr.findById(department.id)}
            key={department.id}
            title={department?.name || ''}
        >
            <Card.List
                selected={selectedUsers}
                style={{ paddingLeft: 0, width: '100%' }}
                activeItem={activeUserId}
                visibleLastItem={() => tabsAndLists.getNextPage('employee')}
                items={updEmployee(tabsAndLists.departmentsEmployees[department.id])}
            />
            {department.id in tabsAndLists.departmentChildrens && tabsAndLists.departmentChildrens[department.id].length && (
                <DepartmentsThreeView
                    selectedUsers={selectedUsers}
                    padding={(padding += 4)}
                    departments={tabsAndLists.departmentChildrens[department.id]}
                    tabsAndLists={tabsAndLists}
                    arr={arr}
                    activeUserId={activeUserId}
                    updEmployee={updEmployee}
                />
            )}
        </Collapse>
    );
}

export default DepartmentsThreeView;
