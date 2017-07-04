FROM mysql:5.7.6
ADD /files/run_db.sh /tmp/
ADD /files/init_db.sh /tmp/
ADD /files/schema.sql /tmp/
RUN chmod +x /tmp/init_db.sh
RUN chmod +x /tmp/run_db.sh
RUN chmod +x /tmp/schema.sql
RUN ls -la /tmp/init_db.sh /tmp/run_db.sh
RUN /tmp/init_db.sh
ENTRYPOINT "/tmp/run_db.sh"