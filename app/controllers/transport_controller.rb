class TransportController < ApplicationController
  require 'protobuf'
  require 'google/transit/gtfs-realtime.pb'
  require 'net/http'
  require 'uri'

 def public_transport
 end

  def public_transport_tracking
    auth = 'apikey ' + ENV['TRANSPORT_API_KEY']
    url = 'https://api.transport.nsw.gov.au/v1/gtfs/vehiclepos/sydneytrains'
    @resource = RestClient::Resource.new( url )
    @response = @resource.get( :Authorization => auth )

    @feed = Transit_realtime::FeedMessage.decode(@response)
    render 'public_transport_tracking.json'
  end
end
