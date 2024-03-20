function updatePhone(phone: string) {
    return `${phone?.split('').slice(0, 2).join('')} (${phone?.split('').slice(2, 5).join('')}) ${phone?.split('').slice(5, 8).join('')}-${phone
        ?.split('')
        .slice(8, 10)
        .join('')}-${phone?.split('').slice(10, 12).join('')}`;
}

export default updatePhone;
