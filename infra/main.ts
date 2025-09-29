import type { Construct } from "constructs";
import { App, TerraformOutput, TerraformResource, TerraformStack } from "cdktf";
import { S3Bucket } from "./.gen/modules/s3-bucket";
import { Cloudfront } from "./.gen/modules/cloudfront";
import { S3Bucket as bucket2 } from "@cdktf/provider-aws/lib/s3-bucket";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const bucket = new S3Bucket(this, "siteBucket", {
      bucket: "icecube.dog-site-origin",
    });

    const cloudfront = new Cloudfront(this, "cdn", {
      enabled: true,
      createOriginAccessControl: true,
      origin: {
        s3_website: {
          domain_name: bucket.s3BucketBucketDomainNameOutput,
          bucket: bucket.bucket,
          origin_access_control_id: "",
        },
      },
      httpVersion: "http2and3",
      defaultCacheBehavior: {
        target_origin_id: "s3origin",
        viewer_protocol_policy: "redirect-to-https",
        allowed_methods: ["GET", "HEAD"],
        cached_methods: ["GET", "HEAD"],
        compress: true,
        forwarded_values: { query_string: false, cookies: { forward: "none" } },
      },
      originAccessControl: {
        main: {
          name: "icecube.dog-oac",
          description: "OAC for icecube.dog",
          origin_type: "s3",
          signing_behavior: "always",
          signing_protocol: "sigv4",
        },
      },
      dependsOn: [bucket],
    });

    const bucket_arn = new TerraformOutput(this, "bucket_arn", {
      value: bucket.s3BucketArnOutput,
    });

    const cf_dist_id = new TerraformOutput(this, "cf_dist_id", {
      value: cloudfront.cloudfrontDistributionIdOutput,
    });
  }
}

const app = new App();
new MyStack(app, "infra");
app.synth();
