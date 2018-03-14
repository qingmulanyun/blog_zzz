require "net/http"
require "net/https"
require "uri"

module Delivery
  class Track_service
    attr_accessor :track_number, :url

    include Exceptions

    def initialize(track_number, url)
      @url = url
      @track_number = track_number
    end

    def query_delivery_order
      response = Net::HTTP.post_form(URI.parse(@url), { OrderId: @track_number})
      doc = Nokogiri::HTML(response.body)
      a = doc.css('igg_LaytonItem','ig_LaytonItem')
      puts a
    end
  end
end
