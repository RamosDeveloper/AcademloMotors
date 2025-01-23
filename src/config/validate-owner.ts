export const protectAccountOwner = (ownerUserId: string, sessionUserId: string) => {
    return ownerUserId === sessionUserId;
};