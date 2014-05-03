## (Cathode) Ray Tube

A custom monitoring setup.

### Architecture Considerations

There are generally two ways of getting data into a monitoring system. Either
you send data to the store from your systems and alert if no data comes in. Or
you reach out to the server and ask it for data and if you can't connect you
alert. Both have some pretty justifiable use cases.

When you are running on a PaaS or trying to limit the number of services you run
on your servers, it can be really nice to just provide an endpoint for your
monitoring to hit and gather data. It grabs the data and either it is a very
specific endpoint, so you get just a truthy value for whether something is up.
Or it is a more complex object returned with a more complete status of the
system, that the monitoring system then has to know how to pull apart into
different pieces.

When you have data that you'd like to send at more irregular intervals, such as
when an event happens or if the service is typically short lived. Or you have a
service that doesn't expose an external interface, it can make things quite a
bit easier if you can just push data to your monitoring setup. Another use case
is for things that do offline data gathering then bulk upload it.

Ray Tube will need to be flexible enough to deal with both. For the back end I'm
currently considering keeping the data in both ElasticSearch and PostgreSQL.
PostgreSQL will be the source of truth with a rigid data structure,
ElasticSearch will be used for Kibana as well as my own custom analysis.
PostgreSQL has well known and paved paths for migrations, making it more ideal
to store the data and be able to extend it in the future. ElasticSearch has
known patterns for building new indexes and switching over to them when they are
done being built giving highly available but also able to be easily redesigned.

https://github.com/wraithan/raytube/issues will have all the use stories.
