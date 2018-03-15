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
      temp_str = ''
      collections = doc.css('table').last.css('span').to_a
      collections.each_with_index do |span_ele, index|
        if span_ele.child.present?
          content = span_ele.child.inner_text
          temp_str += "#{content}||"
           if collections[index + 1].present? && collections[index + 1].child.present?
             next_content = collections[index + 1].child.inner_text
             if valid_date?(next_content)
               result.push(temp_str)
               temp_str = ''
             end
           end
        end
      end
      result
    end

    private

    def valid_date?(string)
      DateTime.strptime(string, '%Y-%m-%d %H:%M:%S')
      true
    rescue ArgumentError
      false
    end
  end
end
