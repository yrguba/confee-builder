import React from 'react';

import { companyApi, employeeProxy, EmployeeProfileView } from 'entities/company';
import { useRouter } from 'shared/hooks';

import { useCall } from '../../../../entities/call';
import { chatApi, chatProxy } from '../../../../entities/chat';

function EmployeeProfile() {
    const { params, navigate } = useRouter();

    const meet = useCall();

    const { data: employeeData, isLoading } = companyApi.handleGetEmployee({ employeeId: params.employee_id });
    const { data: chatData } = chatApi.handleGetChatWithEmployee({ employeeId: employeeData?.id });
    const { mutate: handleCreateCompanyChat } = chatApi.handleCreateCompanyChat();

    const getChat = () => {
        if (chatData) {
            navigate(`/chats/company/${params.company_id}/chat/${chatData.id}`);
        } else if (employeeData?.id) {
            handleCreateCompanyChat(
                { body: { employee_ids: [employeeData.id], is_group: false }, companyId: params.company_id },
                {
                    onSuccess: (res) => {
                        navigate(`/chats/company/${params.company_id}/chat/${res?.data.data.id}`);
                    },
                }
            );
        }
    };

    const getCall = () => {
        if (chatData) {
            meet.openCreateMeet(chatProxy(chatData));
        } else if (employeeData?.id) {
            handleCreateCompanyChat(
                { body: { employee_ids: [employeeData.id], is_group: false }, companyId: params.company_id },
                {
                    onSuccess: (res) => {
                        meet.openCreateMeet(chatProxy(res?.data.data));
                    },
                }
            );
        }
    };

    return (
        <EmployeeProfileView
            actions={{
                getChat,
                delete: () => '',
                audioCall: getCall,
                videoCall: () => '',
                mute: () => '',
            }}
            back={() => navigate(-1)}
            employee={employeeProxy(employeeData)}
            loading={isLoading}
        />
    );
}

export default EmployeeProfile;
