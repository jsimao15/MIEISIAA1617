#!/bin/bash
set -e
set -x
mysqld --initialize-insecure
/usr/sbin/mysqld &
mysql_pid=$!
until mysqladmin ping >/dev/null 2>&1; do
	echo -n "."; sleep 0.2
done
mysql -e "GRANT ALL ON *.* TO root@'%' IDENTIFIED BY 'root' WITH GRANT OPTION"
mysql < /tmp/schema.sql
mysqladmin shutdown
wait $mysql_pid
tar czvf default_mysql.tar.gz /var/lib/mysql