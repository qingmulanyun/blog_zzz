module Delivery
  class AuExpress < BaseCarrier

    def query_delivery_order
      query_result = {}
      track_numbers.each do |track_number|
        query_result[track_number] = shipping_carrier_api(track_number)
      end
      query_result
    end

    def shipping_carrier_api(track_number)
      result = []
      response = RestClient.post(@url, { act: 'show', waybill: track_number, submit: '立即查询'})  { |response, request, result|
        case response.code
          when 301, 302, 307
            response.follow_redirection
          else
            response.return!
        end
      }
      doc = Nokogiri::HTML(response.body)
      temp_str = ''
      collections = doc.css('table').last.css('td').to_a.drop(3)
      collections.each_with_index do |td_ele, index|
        if td_ele.inner_text.present?
          content = td_ele.inner_text.strip
          temp_str += "#{content}||"
           if valid_tracking_info(collections, index)
             result.push(temp_str)
             temp_str = ''
           end
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
