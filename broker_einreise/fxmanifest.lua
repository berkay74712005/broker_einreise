fx_version 'bodacious'

game 'gta5'

description 'broker einreise'

version '1.0.0'

ui_page 'html/index.html'

client_scripts {
	'client.lua'
}

server_scripts {
	'@oxmysql/lib/MySQL.lua',
	'server.lua'
}

files {
    'html/*'
}