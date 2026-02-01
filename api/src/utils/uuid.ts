export const uuidUtils = {
    toBin: (uuid: string) => Buffer.from(uuid.replace(/-/g, ''), 'hex'),

    toStr: (bin: any) => {
        // On force la conversion en Buffer au cas où
        const buf = Buffer.isBuffer(bin) ? bin : Buffer.from(bin);
        const hex = buf.toString('hex');
        return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    }
};