module Delivery
  class BlueSky < BaseCarrier
    @@url = ENV['BLUE_SKY_SERVICE_HOST_URL']
    
    def shipping_carrier_api(track_number)
      result = []
      response = RestClient.post(@@url, { cno: track_number})  { |response, request, result|
        case response.code
          when 301, 302, 307
            response.follow_redirection
          else
            response.return!
        end
      }
      doc = Nokogiri::HTML(response.body)
      temp_str = ''
      collections = doc.at_css("table#oTHtable").elements
      collections.each_with_index do |td_ele, index|
        next if index.zero? # remove the header line
        if td_ele.present?
          td_ele.elements.each_with_index do |details|
            content = details.inner_text.strip
            temp_str += "#{content}||"
          end
          result.push(temp_str)
          temp_str = ''
        end
      end
      result
    end

    private

    def valid_tracking_info(collections, index)
      collections[index + 1].present? && collections[index + 1].present? && valid_date?(collections[index + 1].inner_text.strip) || collections[index + 1].nil?
    end

    def valid_date?(string)
      DateTime.strptime(string, '%Y-%m-%d %H:%M:%S')
      true
    rescue ArgumentError
      false
    end
  end
end
