description {{ description }}
author {{ author }}

start on started mountall
stop on shutdown 

respawn
respawn limit 99 5 

script
    export HOME="/root"
    exec /usr/bin/nodejs {{ path }} >> >> {{ log_path }}{{ log_name }}  2>&1
end script
