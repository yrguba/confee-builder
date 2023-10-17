import React from 'react';

import { companyApi, employeeProxy, EmployeeProfileView } from 'entities/company';
import { useRouter } from 'shared/hooks';

import { chatApi } from '../../../../entities/chat';

function EmployeeProfile() {
    const { params, navigate } = useRouter();

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

    return (
        <EmployeeProfileView
            actions={{
                getChat,
                delete: () => '',
                audioCall: () => '',
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
