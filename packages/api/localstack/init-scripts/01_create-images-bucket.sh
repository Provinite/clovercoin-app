#!/bin/sh
awslocal s3api create-bucket --bucket images --acl public-read-write
awslocal s3api put-bucket-cors --bucket images --cors-configuration file:///etc/localstack/init/ready.d/cors.json