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

  def public_transport_time_table
    auth = 'apikey ' + 'BoUSWq0Ey6racBFC2wBmRDfuumRVLQ6s91HZ'
    time_table_url = 'https://api.transport.nsw.gov.au/v1/gtfs/schedule/sydneytrains'
    @time_table_resource = RestClient::Resource.new( time_table_url )
    @time_table_response = @time_table_resource.get( :Authorization => auth )

    render 'public_transport_timetable.json'
  end
end
