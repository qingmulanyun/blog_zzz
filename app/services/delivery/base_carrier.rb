module Delivery
  class BaseCarrier
    attr_accessor :track_numbers

    include Exceptions

    def initialize(track_numbers)
      @track_numbers = track_numbers
    end

    def query_delivery_order
      query_result = {}
      track_numbers.each do |track_number|
        query_result[track_number] = shipping_carrier_api(track_number)
      end
      query_result
    end

    def shipping_carrier_api(track_number) end
  end
end
