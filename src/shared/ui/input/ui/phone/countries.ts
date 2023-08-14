import { BaseTypes } from 'shared/types';

function countries() {
    const countries: BaseTypes.Item<any, { code: string; id: number }>[] = [
        { id: 0, icon: 'russia', title: 'Россия +7', payload: { code: '+7', id: 0 } },
        { id: 1, icon: 'armenia', title: 'Армения +374', payload: { code: '+374', id: 1 } },
        { id: 2, icon: 'belarus', title: 'Беларусь +375', payload: { code: '+375', id: 2 } },
        { id: 3, icon: 'kazakhstan', title: 'Казахстан +7', payload: { code: '+7', id: 3 } },
        { id: 4, icon: 'kyrgyzstan', title: 'Киргизия +9', payload: { code: '+9', id: 4 } },
        { id: 5, icon: 'uzbekistan', title: 'uzbekistan +998', payload: { code: '+ 998', id: 5 } },
    ];
    return countries;
}

export default countries();
