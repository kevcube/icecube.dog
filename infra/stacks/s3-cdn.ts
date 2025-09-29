import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";
import { cloudfrontDistribution } from "@cdktf/provider-aws";
import { TerraformStack } from "cdktf";

class S3CDNStack extends TerraformStack {
  constructor(scope: Construct, id: String) {}
}
