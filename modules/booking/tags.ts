export const bookingTags = {
	bookings: 'bookings',
	availability: 'availability',
	bookingTypes: 'booking-types',
	clientBookings: (clientId: string) => `bookings:client:${clientId}`
};
