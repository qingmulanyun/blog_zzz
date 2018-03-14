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
      result = []
      response = Net::HTTP.post_form(URI.parse(@url), { OrderId: @track_number})
      doc = Nokogiri::HTML(response.body)
      doc.css('table').last.css('span').each do |span_ele|
        if span_ele.child.present?
         Date.parse(span_ele.child.inner_text)
        end
      end
    end
  end
end
