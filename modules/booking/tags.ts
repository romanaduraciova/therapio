export const bookingTags = {
	bookings: 'bookings',
	availability: 'availability',
	clientBookings: (clientId: string) => `bookings:client:${clientId}`
};
