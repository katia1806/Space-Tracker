from pyspark.sql import SparkSession
from pyspark.sql.functions import col, from_json
from pyspark.sql.types import StructType, StructField, StringType, DoubleType, IntegerType

# Initialisation de la session Spark
spark = SparkSession.builder \
    .appName("SpaceObjectStreaming") \
    .getOrCreate()

# Définir le schéma des données
schema = StructType([
    StructField("id", StringType(), True),
    StructField("timestamp", IntegerType(), True),
    StructField("position", StructType([
        StructField("x", DoubleType(), True),
        StructField("y", DoubleType(), True),
        StructField("z", DoubleType(), True)
    ])),
    StructField("vitesse", DoubleType(), True),
    StructField("taille", DoubleType(), True),
    StructField("type", StringType(), True)
])

# Lecture des données depuis Kafka
df = spark.readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("subscribe", "space_data") \
    .load()

# Transformation des données
parsed = df.selectExpr("CAST(value AS STRING)") \
    .select(from_json(col("value"), schema).alias("data")) \
    .select("data.*")

# Écriture de tous les objets dans un fichier
parsed.writeStream \
    .format("parquet") \
    .option("path", "/tmp/objects") \
    .option("checkpointLocation", "/tmp/checkpoints/objects") \
    .outputMode("append") \
    .start()

# Filtrage des objets dangereux
dangerous = parsed.filter((col("vitesse") > 25) & (col("taille") > 10))

# Écriture des objets dangereux dans un autre fichier
dangerous.writeStream \
    .format("parquet") \
    .option("path", "/tmp/dangerous_objects") \
    .option("checkpointLocation", "/tmp/checkpoints/dangerous_objects") \
    .outputMode("append") \
    .start() \
    .awaitTermination()