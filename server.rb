require 'em-websocket'


soc = []

EM::WebSocket.start(host: '10.42.0.1' , port: 5000) do |ws|

  puts "IN"
  ws.onopen{soc << ws;puts "#{soc.length} clients present";}
  ws.onmessage { |msg| ; soc.each do |s|
  				puts msg
				s.send("#{msg}") if s != ws
				end ;}
  ws.onclose {puts "Someone dissconected " ; soc.delete(ws)}

end
