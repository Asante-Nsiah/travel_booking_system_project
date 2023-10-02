import { EntityRepository, Repository } from 'typeorm';
import { BookingOffer } from '../models/booking-offer-entitiy';

@EntityRepository(BookingOffer)
export class BookingOfferRepository extends Repository<BookingOffer> {
  async createBookingOffer(offerData: Partial<BookingOffer>): Promise<BookingOffer> {
    try {
      const bookingOffer = this.create(offerData);
      return await this.save(bookingOffer);
    } catch (error) {
      throw error;
    }
  }
}
