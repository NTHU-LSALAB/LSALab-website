docker exec -t lsalab-postgres-1 pg_dump -c -U strapi > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql